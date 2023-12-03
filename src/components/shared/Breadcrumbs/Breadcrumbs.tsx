import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useMatches } from 'react-router-dom';
import { CrumbData } from './crumb-data';

const Breadcrumbs = () => {
  const matches = useMatches();
  const crumbs: CrumbData[] = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => {
      return {
        path: match.pathname,
        displayName: match.handle.crumb(match.data),
      };
    });

  return (
    <Breadcrumb mb={[2, 5]}>
      {crumbs.map((crumb: CrumbData, index: number) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink fontSize={'sm'}>
            <Link to={crumb.path}>{crumb.displayName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
