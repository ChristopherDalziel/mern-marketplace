import {useRouter} from 'next/router';
import {Container, Pagination} from 'semantic-ui-react';

function ProductPagination({totalPages}) {
  const router = useRouter();

  return (
    <Container textAlign="center" style={{margin: '2em'}}>
      <Pagination
        // Landing page
        defaultActivePage={1}
        // How many pages are there in total
        totalPages={totalPages}
        // 
        onPageChange={(event, data) => {
          data.activePage === 1 
          ? router.push('/') 
          : router.push(`/?page=${data.activePage}`)
        }} 
      />
    </Container>
  )
}

export default ProductPagination;