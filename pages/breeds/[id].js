import Head from 'next/head';
import { useRouter } from 'next/router';
const BreedDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>
      <Head>
        <title>{id} | Meow Portal</title>
      </Head>
    Breed Details Page</div>;
};

export default BreedDetails;
