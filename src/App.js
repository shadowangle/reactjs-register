import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from "aiya_sdk_node";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const fields = ["name", "description", "standard_rate", "brand", "item_name"];
const filters = { disabled: 0 };

class App extends Component {

componentWillMount () {
  console.log(api)
}

 componentDidMount() {
//หลังบ้านส่วน members: http://admin.nsc.aiya.ai/desk#List/NS Member/List

//get all NS members   สังเกตarg แรก คือพิมพ์ตาม "NS Member" ใน url เลย
// api.login("shadowangle1222@gmail.com","0892471456").then(result => {
//   // console.log(result)

// })
api.module='nsc'
api.get_list("NS Member", '*')
.then(res => {
  console.log(res)
});


  //  console.log(api.get_list)
//add a single object
// const data = {
// "awards": [{
//     "type": "NSC",
//     "joined_year": "2018",
//     "project_stage": "ได้รับรางวัล",
//     "reward": "รางวัลที่ 2",
//     "project_title": "AIYA"
// }]
// ,"education_level":"ปริญญาตรี","description":"","salutation":"Mr","first_name":"Atchariya","last_name":"Darote"
// }

// api.new_doc("NS Member" , data)
//        .then((res) => {
//          console.log(res)
//         //  const doc = res.message;
//         //  doc.customer = cookies.get("garage_name");
//         //  doc.items = items;
//         //  doc.delivery_date = this.state.deliveryDate;
//         //  doc.delivery_period = this.state.deliveryTime;
//         //  doc.car_owner = this.state.carOwner;
//         //  doc.plate_number = this.state.plateNumber;
//         //  return doc;
//        })
//        .then(data => api.insert_doc(data))
//        .then(() => message.success("การสั่งซื้อสำเร็จ"))
//        .then(() => this.props.clearCart())
//        .then(() => this.props.history.push("/"))
//        .catch(() => message.error("การสั่งซื้อล้มเหลว"));
 }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <div className="main-content">
        <form className="form-basic" method="post" action="#">

                <div className="form-title-row">
                   <h1>FORM FOR BALLY</h1>
                </div>

                  <div className="form-row">
            <label>
                <span>ที่อยู่อีเมล</span>
                <input type="email" name="email" />
            </label>
                </div>

                <div className="form-row">
            <label>
                <span>คำนำหน้า</span>

                  <div className="form-radio-buttons">

                <div>
                    <label>
                        <input type="radio" name="radio"/>
                        
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="radio"/>
                        
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="radio"/>
                        
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="radio"/>
                        
                    </label>
                </div>
            </div>
            </label>
            </div>

             <div className="form-row">
                <label>
                    <span>ชื่อ-สกุล</span>
                    <input type="text" name="name"/>
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>เบอร์มือถือ</span>
                    <input type="text" name="name"/>
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>Line</span>
                    <input type="text" name="name"/>
                </label>
            </div>
            <div className="form-row">
                <label>
                    <span>Facebook</span>
                    <input type="text" name="name"/>
                </label>
            </div>



 <div className="form-row">
                <label>
                    <span>เยาวชนโครงการ</span>
                </label>
                <div className="form-radio-buttons"   >

                    <div>
                        <label>
                            <input type="radio" name="radio"/>
                            <span>NSC</span>
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="radio" name="radio"/>
                            <span>YSC</span>
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="radio" name="radio"/>
                            <span>YECC</span>
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <label>
                        <span>รุ่นที่เท่าไหร่ ค.ศ.</span>
                        <input type="text" name="name"/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ชื่อผลงานที่ส่งเข้าประกวด</span>
                        <input type="text" name="name"/>
                    </label>
                </div>
            </div>
            <div className="form-row">
                    <label>
                        <span>ผลการแข่งขัน</span>
                        <input type="checkbox" name="checkbox"/>
                        <span >ผ่านรอบข้อเสนอโครงการ</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="checkbox"/>
                        <span >ผ่านถึงรอบนำเสนอผลงาน</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="checkbox"/>
                        <span >เข้ารอบชิงชนะเลิศ</span>

                    </label>
                    <label>
                        <span> </span>
                        <input type="checkbox" name="checkbox"/>
                        <span >ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)</span>

                    </label>
                </div>


                <div className="form-row">
                    <label>
                        <span>รางวัลที่ได้รับจากรอบชิงชนะเลิศ</span>
                        <input type="text" name="name"/>
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        <span>การศึกษาสูงสุด</span>
                        <select name="dropdown">
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
                        <input type="text" name="name"/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>สถานภาพการทำงาน</span>
                        <input type="text" name="name"/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ตำแหน่ง</span>
                        <input type="text" name="name"/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>อธิบายสั้นๆ เกี่ยวกับธุรกิจที่ทำงานอยู่</span>
                        <input type="text" name="name"/>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <span>ไฟล์ ภาพ</span>

                    </label>
                </div>
                
                <div className="form-row">
                    <button type="submit">Submit Form</button>
                </div>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
