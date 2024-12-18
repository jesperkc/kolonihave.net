"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/app";
import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  collection,
  limit,
  getFirestore,
  FieldPath,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Breadcrumbs from "/src/app/components/breadcrumbs";
import Loading from "../components/loading";
// import { useIdentityContext } from "react-netlify-identity-widget";
// import ImageGallery from "./image-gallery";
// import EditMapComponent from "./map";

const TextArea = (props) => {
  const ref = useRef();

  useEffect(() => {
    setTextareaHeight(ref.current);
  });

  return <textarea ref={ref} {...props}></textarea>;
};

function setTextareaHeight(el) {
  el.style.height = `0px`;
  // for box-sizing other than "content-box" use:
  // el.style.cssText = '-moz-box-sizing:content-box';
  el.style.height = `${Math.max(el.scrollHeight, 100)}px`;
}

const EditAllotment = ({}) => {
  const [status, _status] = useState("");
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;
  // const identity = useIdentityContext();
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const params = useParams();
  // const navigate = useNavigate();

  const [allotment, _allotment] = useState(null);

  const id = searchParams?.get("id");

  useEffect(() => {
    const load = () => {
      const fetchUserListings = async () => {
        const listingsRef = collection(db, "listings");
        const docRef = doc(db, "listings", `${id}`);

        const querySnap = await getDoc(docRef);
        let listing = {
          ...querySnap.data(),
        };
        console.log("listing", listing);
        // const docRef = doc(db, "users", id);
        // const snapshot = await getDoc(docRef);
        _allotment(listing);
        setLoading(false);
      };

      fetchUserListings();
    };

    load(id);
  }, [id]);

  const save = async (event) => {
    event.preventDefault();

    if (allotment.text === "") return;
    _status("saving");
    allotment.imagesJSON = allotment.imagesJSONParsed;
  };
  const saveSuccess = (response) => {
    console.log(response);
    _status("");
  };
  const saveFailure = (error, b) => {
    console.log(error, b);
    _status("");
  };

  const updateField = (e, value) => {
    console.log(e.target.name, value, e.target.value);
    // Files
    if (e.target.files) {
      _allotment((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      _allotment((prevState) => ({
        ...prevState,
        [e.target.name]: value || e.target.value,
      }));
    }
  };

  const updateCheckboxField = (e) => {
    _allotment({
      ...allotment,
      [e.target.name]: e.target.checked === true,
    });
  };

  const onChangeLocation = (lat, lng) => {
    _allotment({
      ...allotment,
      lat: Number(lat),
      lng: Number(lng),
    });
  };

  // const onUpdateImagesCB = useCallback(
  // 	images => {
  // 		console.log('onUpdateImages', images);
  // 		_allotment({
  // 			...allotment,
  // 			imagesJSONParsed: images,
  // 		});
  // 	},
  // 	[id] // list of params on which the callback should be recreated, this array might also stay blank
  // );

  const onUpdateImages = (images) => {
    console.log("onUpdateImages", images);
    _allotment({
      ...allotment,
      imagesJSONParsed: images,
    });
  };

  const Checkbox = ({ value, name, label }) => (
    <label className="checkbox">
      <input type="checkbox" checked={value === true} name={name} onChange={updateCheckboxField} /> {label}
    </label>
  );
  // console.log("Render Edit allotment", allotment);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // if (images.length > 6) {
    //   setLoading(false);
    //   toast.error("Max 6 images");
    //   return;
    // }

    let geolocation = {
      lat: 0,
      lng: 0,
    };
    let location;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" ? undefined : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser?.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(() => {
    //   setLoading(false);
    //   toast.error("Images not uploaded");
    //   return;
    // });

    const formDataCopy = {
      ...allotment,
      //imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    // Update listing
    const docRef = doc(db, "listings", `${id}`);
    console.log(docRef, formDataCopy);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    router.push(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const breadcrumbs = [
    {
      title: "Admin",
      slug: "admin",
    },
    {
      title: "Dashboard",
      slug: "dashboard",
    },
  ];

  return (
    <main>
      <Breadcrumbs crumbs={breadcrumbs} />
      {allotment ? (
        <form className="edit-allotment" onSubmit={onSubmit}>
          <div class="field">
            <label class="label">Overskrift</label>
            <div class="control">
              <input
                type="text"
                value={allotment.name}
                className="input mt-1 block w-full"
                placeholder=""
                name="name"
                onChange={updateField}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Beskrivelse</label>
            <div class="control">
              <TextArea value={allotment.text} className="textarea mt-1" rows="3" name="text" onChange={updateField} />
            </div>
          </div>

          <hr />

          <h3 className="mb-4">Bolig</h3>

          <div className="flex flex-wrap columns">
            <div className="column">
              <div class="field">
                <label class="label">
                  Boligareal{" "}
                  <small>
                    m<sup>2</sup>.
                  </small>
                </label>
                <div class="control">
                  <input
                    type="number"
                    value={allotment.houseSize}
                    className="input mt-1"
                    name="houseSize"
                    onChange={(event) => updateField(event, Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div class="field">
                <label class="label">
                  Grundstrørrelse{" "}
                  <small>
                    m<sup>2</sup>.
                  </small>
                </label>
                <div class="control">
                  <input
                    type="number"
                    value={allotment.plotSize}
                    className="input mt-1"
                    name="plotSize"
                    onChange={(event) => updateField(event, Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap columns">
            <div className="column is-half-tablet">
              <div class="field">
                <label class="label">
                  Antal rum <small>(udover evt. badeværelse)</small>
                </label>
                <div class="control">
                  <input
                    type="number"
                    value={allotment.rooms}
                    className="input mt-1"
                    name="rooms"
                    onChange={(event) => updateField(event, Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-label mb-2">Installationer</div>

          <div className="columns">
            <div className="column is-half">
              <ul>
                <li>
                  <Checkbox value={allotment.hasKitchen} name="hasKitchen" label="Køkken" />
                </li>
                <li>
                  <Checkbox value={allotment.hasToilet} name="hasToilet" label="Toilet" />
                </li>
                <li>
                  <Checkbox value={allotment.hasBath} name="hasBath" label="Bad" />
                </li>
                <li>
                  <Checkbox value={allotment.hasPlumming} name="hasPlumming" label="Kloakering" />
                </li>
                <li>
                  <Checkbox value={allotment.hasElectricity} name="hasElectricity" label="Elektricitet" />
                </li>
                <li>
                  <Checkbox value={allotment.residenceRequirement} name="residenceRequirement" label="Bopælspligt" />
                </li>
              </ul>
            </div>
          </div>

          <div className="spacer"></div>
          <hr />
          <div className="spacer"></div>

          <h3 className="mb-4">Økonomi</h3>

          <div className="columns">
            <div className="column">
              <div class="field">
                <label class="label">
                  Pris <small>kr.</small>
                </label>
                <div class="control">
                  <input
                    type="number"
                    value={allotment.price}
                    className="input mt-1"
                    name="price"
                    onChange={(event) => updateField(event, Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div class="field">
                <label class="label">
                  Haveafgift <small>kr./måned</small>
                </label>
                <div class="control">
                  <input
                    type="number"
                    value={allotment.gardenFee || ""}
                    className="input mt-1"
                    name="gardenFee"
                    onChange={(event) => updateField(event, Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="spacer"></div>

          <h3 className="mb-4">Billeder</h3>
          {allotment.imagesJSONParsed && allotment.imagesJSONParsed.length > 1 && (
            <div className="form-label mb-2">Klik og træk for at arrangere billederne</div>
          )}
          {/* <ImageGallery id={allotment._id} images={allotment.imagesJSONParsed || []} onUpdate={onUpdateImages} /> */}

          <div className="spacer"></div>
          <hr />
          <div className="spacer"></div>

          <h3 className="mb-4">Placering</h3>

          {/* <EditMapComponent onChange={onChangeLocation} lat={allotment.lat} lng={allotment.lng} /> */}

          <div className="spacer"></div>
          <Checkbox value={allotment.active} name="active" label="Annoncen er aktiv" />

          <div className="spacer"></div>
          <button className="button footer-button" type="submit">
            {status === "saving" ? "Gemmer..." : "Gem"}
          </button>
        </form>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default EditAllotment;
