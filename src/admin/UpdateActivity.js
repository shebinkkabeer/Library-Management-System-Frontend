import React from "react";
// import TaskList from "./taskList";
import axios from "axios";
import Base from "../core/Base";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Redirect } from "react-router-dom";
import Row from "./Row";
import { API } from "../backend";
class UpdateActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#FFFFFF",
            equipments: [],
            equipment: {
              index: Math.random(),
              ename: "",
              cost: 0,
              maintenence: 0,
              usage: 0,
            },
            code: "",
            type: "",
            name: "",
            lot_size: "0",
            supervisor_count: "0",
            operator_count: "0",
            operation_cost_rate: "0",
            material_cost: "0",
            cycle_time: "0",
            changeover_time: "0",
            uptime: "0",
            va_time: "0",
            nva_time: "0",
            enva_time: "0",
            shifts: "0",
            wastage_time: "0",
            rejection: "0",
            description: "",
            loading: false,
            error: false,
            success: false,
          };
      }
      componentDidMount() {
        const productionId = this.props.match.params.productionId;
        const activityId = this.props.match.params.activityId;

        const tokrole = JSON.parse(localStorage.getItem("jwt"));
        const token  = tokrole.access_token;
      

        axios.get(`${API}/production/data/activity/${productionId}/${activityId}`,{headers: {
          "auth-token": token
         }})
         .then(response=> {
          let data=response.data.details;
          console.log(data);
        this.setState({equipments:data.equipments,type:data.type,code:data.code,lot_size:data.lot_size,
        name:data.name,supervisor_count:data.supervisor_count,operator_count:data.operator_count,operation_cost_rate:data.operation_cost_rate,
        material_cost:data.material_cost,cycle_time:data.cycle_time,changeover_time:data.changeover_time,
        uptime:data.uptime,va_time:data.va_time,nva_time:data.nva_time,enva_time:data.enva_time,
        shifts:data.shifts,wastage_time:data.wastage_time,rejection:data.rejection,description:data.description
        
        })
         })
         .catch(error=>{ 
           
       
          return( {error:error.response.data.message});   
         })
        







      }
 

  setTrue = () =>
    this.state.radio === "activity"
      ? console.log("activity")
      : console.log("waiting");

  addNewRow = (e) => {
    this.setState((prevState) => ({
      equipments: [...prevState.equipments, this.state.equipment],
    }));
    this.setState({
      equipment: {
        index: Math.random(),
        ename: "",
        cost: 0,
        maintenence: 0,
        usage: 0,
      },
    });
  };
  handleChange = (e) => {
    if (["ename", "cost", "maintenence", "usage"].includes(e.target.name)) {
      let { name, value } = e.target;
      if (name !== "ename" && value.length === 0) value = 0;
      else if (name !== "ename") {
        try {
          value = +value.match(/\d+/)[0];
        } catch (e) {
          value = 0;
        }
      }
      this.setState((prevState) => ({
        equipment: { ...prevState.equipment, [name]: value },
      }));
      // console.log(this.state)
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  deteteRow = (index) => {
    this.setState({
      equipments: this.state.equipments.filter((s) => index !== s.index),
    });
    // const taskList1 = [...this.state.taskList];
    // taskList1.splice(index, 1);
    // this.setState({ taskList: taskList1 });
  };

  editRow = (index, equipment) => {
    this.setState((previousState) => {
      const equipments = previousState.equipments;
      equipments[index] = equipment;
      return { equipments };
    });
    // const taskList1 = [...this.state.taskList];
    // taskList1.splice(index, 1);
    // this.setState({ taskList: taskList1 });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;
    var data = {
      production: this.props.match.params.productionId,
      _id: this.props.match.params.activityId,

      equipments: this.state.equipments,
      code: this.state.code,
      type: this.state.type,
      name: this.state.name,
      lot_size: this.state.lot_size,
      supervisor_count: this.state.supervisor_count,
      operator_count: this.state.operator_count,
      operation_cost_rate: this.state.operation_cost_rate,
      material_cost: this.state.material_cost,
      cycle_time: this.state.cycle_time,
      changeover_time: this.state.changeover_time,
      uptime: this.state.uptime,
      va_time: this.state.va_time,
      nva_time: this.state.nva_time,
      enva_time: this.state.enva_time,
      shifts: this.state.shifts,
      wastage_time: this.state.wastage_time,
      rejection: this.state.rejection,
      description: this.state.description,
    };
    // if (this.state.date === "" || this.state.description === "") {
    //   NotificationManager.warning(
    //     "Please Fill up Required Field . Please check Task and Date Field"
    //   );
    //   return false;
    // }
    // for (var i = 0; i < this.state.equipments.length; i++) {
    //   if (
    //     this.state.equipments[i].ename === "" ||
    //     this.state.equipments[i].cost === ""
    //   ) {
    //     NotificationManager.danger(
    //       "Please Fill up Required Field.Please Check Project name And Task Field"
    //     );
    //     return false;
    //   }
    // }
    // let data = { formData: this.state, userData: localStorage.getItem("user") };
    // axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    //   "token"
    // );
    // axios
    //   .post("http://localhost:9000/api/task", data)
    //   .then((res) => {
    //     if (res.data.success) NotificationManager.success(res.data.msg);
    //   })
    //   .catch((error) => {
    //     if (error.response.status && error.response.status === 400)
    //       NotificationManager.error("Bad Request");
    //     else NotificationManager.error("Something Went Wrong");
    //     this.setState({ errors: error });
    //   });
  

    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/production/data/activity/edit`,
        data,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((data) => {
        if (data.status == 201) {
          NotificationManager.success("Information Updated Successfully");
          this.setState({ success: true });
        }
      })
      .catch((err) => {
        {
          this.setState({ error: err.response.data.message, loading: false });
        }
        NotificationManager.warning(this.state.error);
      });
  };
  // {{this.setState({error: err.response.data.message, loading:false});


   func=()=>{
    if (this.state.success) {
        return(
        (
            window.confirm(
              "Updation Successfull...!!! \nClick OK to go to Production Home"
            )
          ) ?( <Redirect
            to={`/admin/production/${this.props.match.params.productionId}`}
          />):window.location.reload(false) 
        )
            
            }
   }





  

  render() {
    // let { equipments } = this.state; //let { notes, date, description, taskList } = this.state
    return (
      <div style={{ background: this.state.color }}>
        <div className="content">
          {this.func()}
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-sm-1"></div>
              <div className="col-sm-10 text-center">
                <div className="card">
                  <p className="text-center text-danger">
                    <NotificationContainer />
                  </p>
                  <div className="card-header text-center">
                    <p className="text-dark">
                      Select Type :{" "}
                      <input
                        type="radio"
                        name="type"
                        value="activity"
                        checked={this.state.type=="activity"}

                      />
                      Activity
                      <input
                        className="ml-3"
                        type="radio"
                        name="type"
                        onChange={() => this.setState()}
                        value="waiting"
                        checked={this.state.type=="waiting"}



                      />
                      Waiting
                    </p>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Code</label>
                          <input
                            type="text"
                            name="code"
                            value={this.state.code}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={this.state.name}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Lot Size</label>
                          <input
                            type="number"
                            step="0.1"
                            name="lot_size"
                            value={this.state.lot_size}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Number of Supervisors
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="supervisor_count"
                            value={this.state.supervisor_count}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Number of Operators
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            value={this.state.operator_count}

                            name="operator_count"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Operation Cost Rate
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="operation_cost_rate"
                            value={this.state.operation_cost_rate}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Material Cost</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="material_cost"
                            value={this.state.material_cost}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Cycle Time</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="cycle_time"
                            value={this.state.cycle_time}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Change Over Time</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="changeover_time"
                            value={this.state.changeover_time}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Uptime</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="uptime"
                            value={this.state.uptime}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Value Added Time</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            value={this.state.va_time}

                            name="va_time"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Non Value Added Time
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="nva_time"
                            value={this.state.nva_time}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Essential Non Value Added Time
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="enva_time"
                            value={this.state.enva_time}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">No Of Shifts</label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="shifts"
                            value={this.state.shifts}

                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">Waiting Time</label>
                          <input
                            disabled={this.state.type === "activity"}
                            type="number"
                            step="0.1"
                            name="wastage_time"
                            value={this.state.wastage_time}
                            
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group ">
                          <label className="required">
                            Rejection Percentage
                          </label>
                          <input
                            disabled={this.state.type === "waiting"}
                            type="number"
                            step="0.1"
                            name="rejection"
                            className="form-control"
                            value={this.state.rejection}

                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-group ">
                        <label className="required">Description</label>
                        <textarea
                          rows="2"
                          cols="10"
                          name="description"
                          value={this.state.description}

                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <h6 className="text-center">Equipments</h6>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="required"> Equipment Name</th>
                          <th className="required">Capital Cost</th>
                          <th>Maintenance Cost</th>
                          <th>Total usage</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.equipments.map((equ, index) => (
                          <Row
                            deleteHandler={this.deteteRow}
                            editHandler={this.editRow}
                            value={equ}
                            key={equ.index}
                            index={index}
                          />
                        ))}
                        {/* <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} equipments={equipments} type={this.state.type} /> */}
                        <tr>
                          <td>
                            <input
                              name="ename"
                              value={this.state.equipment.ename}
                            disabled={this.state.type === "waiting"}

                            />
                          </td>
                          <td>
                            <input
                              name="cost"
                              value={this.state.equipment.cost}
                            step="0.1"

                            disabled={this.state.type === "waiting"}
                               
                            />
                          </td>
                          <td>
                            <input
                              name="maintenence"
                              value={this.state.equipment.maintenence}
                            step="0.1"

                            disabled={this.state.type === "waiting"}

                            />
                          </td>
                          <td>
                            <input
                              name="usage"
                              value={this.state.equipment.usage}
                            step="0.1"

                            disabled={this.state.type === "waiting"}

                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary text-center"
                              onClick={this.addNewRow}
                            >
                              Add
                            </button>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-danger">
                  <NotificationContainer />

                  </div>

                  <div className="card-footer text-center">
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-primary text-center"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-1"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default UpdateActivity;
