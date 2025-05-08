"use client"
import { useDispatch, useSelector } from 'react-redux';
import { authenSelectorUser } from '@/redux-toolkit/selector';
import "./style.scss";
function UserPage() {
  const userAuthen = useSelector(authenSelectorUser);
  console.log("user-userpage: ", userAuthen)
  if (!userAuthen) {
    return (
      <p style={{ marginTop: "80px", color: "#fff" }}>Cần đăng nhập để xem thông tin</p>
    )
  }
  return (
    <div>
      <div>
        <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>Tài khoản</p>
      </div>
      <form style={{display:"inline-block", marginTop:"12px"}}>
        <div className='input-element--container'>
          <p className='input-user--text'>Họ và tên</p>
          <input className='input-text-user--element' type='text' />
        </div>

        <div className='input-element--container'>
          <p className='input-user--text'>Email</p>
          <input className='input-text-user--element' type='text' />
        </div>
      </form>
    </div>
  )
}

export default UserPage