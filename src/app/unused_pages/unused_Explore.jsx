import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Kolonihave.net</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
