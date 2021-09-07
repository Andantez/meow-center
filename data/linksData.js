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
    title: 'Charts',
    icon: <ImStatsBars />,
    link: '/charts',
  },
  {
    title: 'About',
    icon: <ImInfo />,
    link: '/about',
  },
];

export default Links