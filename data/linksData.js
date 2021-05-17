import { ImHome, ImList2, ImImages, ImStatsBars, ImInfo } from 'react-icons/im';

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
    title: 'Statistics',
    icon: <ImStatsBars />,
    link: '/statistics',
  },
  {
    title: 'About',
    icon: <ImInfo />,
    link: '/about',
  },
];

export default Links