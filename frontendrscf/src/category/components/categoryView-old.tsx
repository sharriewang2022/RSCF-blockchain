import React, {Component} from 'react'
import {AddCategoryToDataBase} from "../../api/categoryApi";
import { CategoryType} from "../../util/variableTypes";

interface categoryProps {
}

interface categoryState {
  categoryId: string,
  categoryName: string,
  parentId: string,
  parentName: string,
  manufacturer: string,
  supplier: string,
  specific:string,
  // createDate: Date
}

export class CategoryView extends Component<categoryProps, categoryState> {
  constructor(props: categoryProps) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this); 
    this.onChangeParentName = this.onChangeParentName.bind(this);   
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeSupplier = this.onChangeSupplier.bind(this);
    this.onChangeSpecific = this.onChangeSpecific.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      categoryId:"",
      categoryName: "",
      parentId: "",
      parentName: "",
      manufacturer: "",
      supplier: "",
      specific:"",
    };
  }

  onChangeCategoryName(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      categoryName: e.target.value,
    });
  }

  onChangeParentName(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      parentName: e.target.value,
    });
  }

  onChangeManufacturer(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      manufacturer: e.target.value,
    });
  }

  onChangeSupplier(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      supplier: e.target.value,
    });
  }

  onChangeSpecific(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      specific: e.target.value,
    });
  }

  onSubmit(e:React.FormEvent<HTMLFormElement>) {
    const category = {       
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName,
      //Number() 、parseInt()、 parseFloat()      
      parentId: this.state.parentId, 
      parentName: this.state.parentName,   
      manufacturer: this.state.manufacturer,
      supplier: this.state.supplier,         
      specs: this.state.specific,
      current: 0,
      size: 0,
    };
    AddCategoryToDataBase(category);
  }

  render() {
    return (
      <div>
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>CategoryName: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.categoryName}
              onChange={this.onChangeCategoryName}
            />
          </div>          
           
          <div className="form-group">
            <label>Parent Name: </label>
            <select
              required
              className="form-control"
              value={this.state.parentName}
              // onSelect={this.onChangeParentName}
            />
          </div>          
          <div className="form-group">
            <label>Manufacturer: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.manufacturer}
              onChange={this.onChangeManufacturer}
            />
          </div>
          <div className="form-group">
            <label>Supplier: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.supplier}
              onChange={this.onChangeSupplier}
            />
          </div>
          <div className="form-group">
            <label>Discriptiion: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.specific}
              onChange={this.onChangeSpecific}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Category"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryView;
