import AuthComponent from "../components/profile/auth.component";
import ProfileComponent from "../components/profile/profile.component";

// export const getServerSideProps = async (ctx) => {
//   const props = await serversideAuth(ctx);
//   return props;
// };

function ProfileIndex({}) {
  // const auth = await serversideAuthInApp();
  return (
    <main className="profile">
      <h1>Profil</h1>
      <AuthComponent>
        <ProfileComponent />
      </AuthComponent>
    </main>
  );
}

export default ProfileIndex;
