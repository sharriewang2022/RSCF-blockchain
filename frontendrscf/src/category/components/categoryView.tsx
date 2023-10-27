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

        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip"/>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
          <div className="col-12">
            <button className="btn btn-primary">List</button>
          </div>
        </form>



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
