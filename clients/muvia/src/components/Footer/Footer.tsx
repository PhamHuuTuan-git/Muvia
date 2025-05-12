import "./style.scss";

const Footer = () => {
  return (
    <div>
      <div className='footer--container'>
        <div className="flex-2">
          <div className="logo-footer--container">
            <img src="/white_on_trans.png" />
          </div>
          <p className="footer-content" style={{ color: "#fed875", fontWeight: "bold" }}>Địa chỉ: <span style={{ color: "#c0bcc0", fontWeight: "200" }}>Binh Thanh district, Ho Chi Minh City, Viet Nam</span></p>
          <p className="footer-content" style={{ color: "#fed875", marginTop: "8px", fontWeight: "bold" }}>Liên hệ: <span style={{ color: "#c0bcc0", fontWeight: "200" }}>0928895717</span></p>
        </div>
        <div className="flex-1">
          <h2 style={{ color: "#fed875", fontWeight: "bold" }}>Kết nối</h2>
          <div className="mt-[20px]">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100049653632141" className="footer-logo--container">
              <img src="/Facebook_Logo.png" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100049653632141" className="footer-logo--container">
              <img src="/Instagram_logo.webp" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100049653632141" className="footer-logo--container">
              <img src="/X_logo.webp" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100049653632141" className="footer-logo--container">
              <img src="/Youtube_logo.png" />
            </a>
          </div>
        </div>
        <div className="flex-1">
          <p className="footer-content" style={{color:"#c0bcc0"}}>TnN – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!</p>
        </div>
      </div>
    </div>
  )
}

export default Footer