import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return <h1>SOME SUPER SECRET PAGE</h1>;
};
Profile.auth = true;
export default Profile;
