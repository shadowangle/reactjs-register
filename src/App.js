import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from "aiya_sdk_node";
import Cookies from 'universal-cookie'
import {Table,Button,Col,Row } from 'antd'
import 'antd/dist/antd.css';
const cookies = new Cookies()

const fields = ["name", "description", "standard_rate", "brand", "item_name"];
const filters = { disabled: 0 };


  const columns = [{
    title: 'Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },{
    title: 'Surename',
    dataIndex: 'last_name',
    key: 'last_name',
  },
//   {
//     title: 'Surename',
//     dataIndex: 'last_name',
//     key: 'last_name',
//   }
];
class App extends Component {

componentWillMount () {
  api.module='nsc'
api.get_list("NS Member", '*')
.then(res => {
  console.log(res.message)
  let dataSource=[]
  res.message.map((message,index)=>{
    const person={...message, key:index}
    // console.log(person)
    dataSource.push(person)
  })
      this.setState({ dataSource });
});
}



toggleCheckkbox = (event) => {
    const { name } = event.target
    const checkbox = {...this.state.checkbox}
    checkbox[name] = !checkbox[name]
    this.setState({checkbox})
}
 componentDidMount() {
//หลังบ้านส่วน members: http://admin.nsc.aiya.ai/desk#List/NS Member/List

//get all NS members   สังเกตarg แรก คือพิมพ์ตาม "NS Member" ใน url เลย
// api.login("shadowangle1222@gmail.com","0892471456").then(result => {
//   // console.log(result)

// })
// api.module='nsc'
// api.get_list("NS Member", '*')
// .then(res => {
//   console.log(res)
// });



  //  console.log(api.get_list)
//add a single object
const data = {
"awards": [{
    "type": "NSC",
    "joined_year": "2018",
    "project_stage": "ได้รับรางวัล",
    "reward": "รางวัลที่ 2",
    "project_title": "AIYA"
}]
,"education_level":"ปริญญาตรี","description":"","salutation":"Mr","first_name":"Natthagid","last_name":"Thommachot"
}

 }

 signup = () => {
   
    console.log(this.state.email)
    const data = {"data":{"doctype":"NS Member",
        "awards": [{
    "type": this.state.awardtype,
    "joined_year": this.state.generation,
    "project_stage": "ได้รับรางวัล",
    "reward": this.state.projectTitle,
    "project_title": this.state.pricename 
    }],
    "education_level":this.state.education,
    "description":this.state.businessDes,
    "salutation":this.state.salutation,
    "first_name":this.state.first_name,
    "last_name":this.state.last_name,
    "phone":this.state.phone,
    "line":this.state.line,
    "facebook":this.state.facebook,
    "company":this.state.company,
    "position":this.state.position,
    "company_description":this.state.businessDes
}
    }
    api.call({
        method: 'nsc.client.register',
        args : data
      }).then(res => {
        // this.result = JSON.stringify(res, null, 2)
        console.log(res)
      })
     
        this.setState({registerPage : false })
  }
  
 constructor(props) {
    super(props)
    this.state = {
        email: '',
        first_name:'',
        last_name:'',
        phone:'',
        line:'',
        facebook:'',
        generation:'',
        pricename:'',
        projectTitle:'',
        education:'',
        status:'',
        businessDes:'',
        awardtype:'',
        company:'',
        registerPage: false,
        data:null
    }
}
handleText = (event) => {
    const { name, value } = event.target  
    const state={}
    state[name] = value
    this.setState(state)
    
  }
  render() {
      console.log(this.state)
    return (
      <div className="App" style={{ backgroundColor: 'white'}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
       <div style={{margin:'0 auto'}} >
   <Button type="primary" style={{margin: 10}} onClick={() => this.setState({registerPage : false})}>Show list</Button>
    <Button type="primary" style={{margin: 10}} onClick={() => this.setState({registerPage : true})}>Register</Button>
        </div>
        <div className="main-content" hidden={this.state.registerPage !== true}>
        <form className="form-basic" method="post" action="#">

 
                <div className="form-title-row">
                   <h1>FORM Register</h1>

                </div>

                  <div className="form-row">
            <label>
                <span>ที่อยู่อีเมล</span>
                <input type="email" name="email" onChange={this.handleText} value={this.state.email} />
            </label>
                </div>

                <div className="form-row">
            <label>
                <span>คำนำหน้า</span>

                  <div className="form-radio-buttons">

                <div>
                    <label>
                        <input type="radio" name="salutation" value="Mr." onChange={this.handleText} />
                        <span style={{width: 0,paddingLeft: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                        paddingTop: 0}}>
                        นาย</span>
                        
                    </label>
                </div>
                <div>
                    <label>
                    <input type="radio" name="salutation" value="Mrs." onChange={this.handleText} />
                        <span style={{width: 0,paddingLeft: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                        paddingTop: 0}}>
                        นาง</span>
                        
                    </label>
                </div>
                <div>
                    <label>
                    <input type="radio" name="salutation" value="Ms." onChange={this.handleText} />
                        <span style={{width: 0,paddingLeft: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                        paddingTop: 0}}>
                        นางสาว</span>
                        
                    </label>
                </div>
                <div>
                    <label>
                    <input type="radio" name="salutation" value="other" onChange={this.handleText} />
                        <span style={{width: 80,paddingLeft: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                        paddingTop: 0}}>
                        อื่นๆ โปรดระบุ</span>
                        
                    </label>
                </div>
                <div className="form-row" hidden={this.state.salutation !== "other"} >
                <label>
                    <input type="text" name="salutationOther" onChange={this.handleText} value={this.state.salutationOther} />
                </label>
            </div>
            </div>
            </label>
            </div>

             <div className="form-row">
                <label>
                    <span>ชื่อจริง</span>
                    <input type="text" name="first_name" onChange={this.handleText} value={this.state.first_name} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>นามสกุล</span>
                    <input type="text" name="last_name" onChange={this.handleText} value={this.state.last_name} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>เบอร์มือถือ</span>
                    <input type="text" name="phone" onChange={this.handleText} value={this.state.phone} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>Line</span>
                    <input type="text" name="line" onChange={this.handleText} value={this.state.line} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>Facebook</span>
                    <input type="text" name="facebook" onChange={this.handleText} value={this.state.facebook} />
                </label>
            </div>



 <div className="form-row">
                <label>
                    <span>เยาวชนโครงการ</span>
                </label>
                <div className="form-radio-buttons"   >

                    <div>
                        <label>
                            <input type="radio" value="NSC"  name="awardtype" onChange={this.handleText}/>
                            <span>NSC</span>
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="radio" value="YSC"  name="awardtype" onChange={this.handleText}/>
                            <span>YSC</span>
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="radio" value="YECC"  name="awardtype" onChange={this.handleText}/>
                            <span>YECC</span>
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <label>
                        <span>รุ่นที่เท่าไหร่ ค.ศ.</span>
                        <input type="text" name="generation" onChange={this.handleText} value={this.state.generation}/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ชื่อผลงานที่ส่งเข้าประกวด</span>
                        <input type="text" name="pricename" onChange={this.handleText} value={this.state.pricename}/>
                    </label>
                </div>
            </div>
            <div className="form-row">
                    <label>
                        <span>ผลการแข่งขัน</span>
                        <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox1} />
                        <span >ผ่านรอบข้อเสนอโครงการ</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox2} />
                        <span >ผ่านถึงรอบนำเสนอผลงาน</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox3} />
                        <span >เข้ารอบชิงชนะเลิศ</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox4} />
                        <span >ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)</span>

                    </label>
                </div>


                <div className="form-row">
                    <label>
                        <span>รางวัลที่ได้รับจากรอบชิงชนะเลิศ</span>
                        <input type="text" name="projectTitle" onChange={this.handleText} value={this.state.projectTitle}/>
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        <span>การศึกษาสูงสุด</span>
                        <select name="education" onChange={this.handleText} >
                            <option></option>
                            <option>ปริญญาตรี</option>
                            <option>ปริญญาโท</option>
                            <option>ปริญญาเอก</option>
                            <option>อื่นๆ</option>
                        </select>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ระบุสถาบันการศึกษาตามข้อ 11</span>
                        <input type="text" name="university" onChange={this.handleText} value={this.state.university}/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ชื่อบริษัท</span>
                        <input type="text" name="company" onChange={this.handleText} value={this.state.company}/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ตำแหน่ง</span>
                        <input type="text" name="position" onChange={this.handleText} value={this.state.position}/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>อธิบายสั้นๆ เกี่ยวกับธุรกิจที่ทำงานอยู่</span>
                        <input type="text" name="businessDes" onChange={this.handleText} value={this.state.businessDes}/>
                    </label>
                </div>
                    <Button type="primary" onClick={this.signup}>Submit Form</Button>
                   
        </form>
       
        </div>
        <div hidden={this.state.registerPage !== false}>
        <Table dataSource={this.state.dataSource} columns={columns} userRowSelect="onUserRowSelect($event)"  />
        </div>
      </div>
    );
  }
}

export default App;
