import { useEffect } from "react";
import LayoutComponent from "../../components/layout";
import { IProductListHook } from "./hooks/useProductList.hook";
import { ICategoryHook } from "../categoryList/hooks/useDbCategory.hook";
import ProductCategorySelectsComponent from "./components/ProductCategorySelects.component";
import ProductListTableComponent from "./components/ProductListTable.component";

interface IProductListProps {
  productListHook: IProductListHook;
  categoryHook: ICategoryHook;
  onNavigate?: (url: string) => void;
}

const ProductListModule: React.FC<IProductListProps> = (props) => {
  const onInitHandler = () => {
    props.categoryHook.getCategoryListAction();
  };

  useEffect(() => {
    onInitHandler();
  }, []);

  const onSelectCategoryTypeHandler = async (idTipo: string) => {
    await props.categoryHook.getDescriptionListAction(idTipo);
    await props.productListHook.getProductListAction(idTipo);
  };

  const onSelectDescriptionTypeHandler = async (
    idTipo: string,
    idDescription: string
  ) => {
    await props.productListHook.getProductListForTypeAndDescriptionAction(
      idTipo,
      idDescription
    );
  };

  return (
    <LayoutComponent>
      <>
        <h1>Título de la Sección</h1>
        <ProductCategorySelectsComponent
          categoryList={props.categoryHook.categoryList}
          onSelectCategoryTypeHandler={onSelectCategoryTypeHandler}
          descriptionList={props.categoryHook.descriptionList}
          onSelectDescriptionTypeHandler={onSelectDescriptionTypeHandler}
        />
        {props.productListHook.productList.map((product, index) => (
          <div style={{ width: "100%", marginTop: "50px" }} key={index}>
            <h3 style={{}}>{product.descripcionProducto}</h3>
            <ProductListTableComponent data={product.productos} />
          </div>
        ))}
      </>
    </LayoutComponent>
  );
};

export default ProductListModule;
