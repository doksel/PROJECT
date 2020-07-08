import React, { useEffect, FormEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import Button from "../../common/Button";
import Input from "../../common/Input";

import { required } from "../../../helpers/validate";
import { AppDispatchType } from "../../../store/store";
import {
  getCategoryById,
  createCategory,
} from "../../../store/categoryStore/actions";
import { CategoryType } from "../../../store/categoryStore/reducer";

type RootStateType = {
  categoryStore: any;
};

type ParamsType = {
  id: string;
  type: string;
};

const Form: React.FC<InjectedFormProps<CategoryType>> = ({
  handleSubmit,
  reset,
}) => {
  let history = useHistory();
  let params = useParams<ParamsType>();

  const dispatch: AppDispatchType = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
  const isLoading = useTypedSelector((state) => state.categoryStore.isLoading);
  const category = useTypedSelector((state) => state.categoryStore.category);

  useEffect(() => {
    if (params.type !== "create") {
      dispatch(getCategoryById(params.id));
    }
  }, []);

  const formSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const typeParams = params.type

    handleSubmit((values: CategoryType) => {
      if(typeParams === "create")dispatch(createCategory(values));
      if(typeParams === "edit")dispatch(createCategory(values));
      
    })();

    history.push("/admin/categories");
    reset();
  };

  console.log(params);

  return (
    <>
      <h1>Category</h1>
      <form onSubmit={formSubmit}>
        <Field
          name="name"
          component={Input}
          defaultValue={category && category.name}
          label="Category's name"
          placeholder="Enter name of category"
          validate={[required]}
        />

        <Button
          htmlType="submit"
          type="primary"
          loading={isLoading}
          text="Enter"
        />
      </form>
    </>
  );
};

export default reduxForm<CategoryType>({
  form: "create",
  enableReinitialize: true,
})(Form);
