import { FC } from "react";
import useCategoryHook from "./hooks/useDbCategory.hook";
import { useDbCategoryService } from "./services/useDbCategory.service";
import CategoryListModule from "./module";

interface ICategoryList {
  onNavigate?: (url: string) => void;
}

const CategoryListFeature: FC<ICategoryList> = (props) => {
  const categoryHook = useCategoryHook({
    dBCategoryService: useDbCategoryService(),
  });

  return (
    <>
      <CategoryListModule
        categoryHook={categoryHook}
        onNavigate={props.onNavigate}
      />
    </>
  );
};

export default CategoryListFeature;
