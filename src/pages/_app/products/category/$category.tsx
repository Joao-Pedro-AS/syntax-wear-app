import { createFileRoute } from '@tanstack/react-router';
import { ProductList } from '../../../../components/ProductList';
import { products } from '../../../../mocks/products';

export const Route = createFileRoute('/_app/products/category/$category')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Produtos - SyntaxWear' }
    ],
  }),
});

function RouteComponent() {

  const { category } = Route.useParams();

  const filteredProducts = products.filter(product => (product.category?.name ?? "").toLowerCase() === category.toLowerCase());

  return (
    <section className="container pt-44 md:pt-54 pb-10 md:px-10 mb-10 text-black">

      <h1 className="text-3xl text-center mb-3">Lista de Produtos</h1>

      <h2 className="text-center text-2xl mb-10 p-4">Conforto excepcional para suas aventuras no dia-a-dia</h2>

      {
        filteredProducts.length === 0 ? (
          <p className='text-center'>Nenhum produto para esta categoria.
          </p>
        ) : (
          <ProductList products={filteredProducts} />
        )
      }
    </section>
  );
}