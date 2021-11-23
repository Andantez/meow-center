import { ImHome, ImList2, ImImages } from 'react-icons/im';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoStatsChart } from 'react-icons/io5';

const Links = [
  {
    title: 'Home',
    icon: <ImHome />,
    link: '/',
  },
  {
    title: 'Breeds',
    icon: <ImList2 />,
    link: '/breeds',
  },
  {
    title: 'Gallery',
    icon: <ImImages />,
    link: '/gallery',
  },
  {
    title: 'Charts',
    icon: <IoStatsChart />,
    link: '/charts',
  },
  {
    title: 'About',
    icon: <IoMdInformationCircle />,
    link: '/about',
  },
];

export default Links;
