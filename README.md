# Muvia - Website Xem Phim Online

**Muvia** là một nền tảng xem phim trực tuyến, cung cấp một thư viện phong phú các bộ phim, từ các bộ phim mới nhất, phim bom tấn, cho đến các thể loại đa dạng như hành động, khoa học viễn tưởng, tình cảm, và nhiều thể loại khác. Với giao diện thân thiện và dễ sử dụng, Muvia giúp người dùng dễ dàng tìm kiếm và thưởng thức những bộ phim yêu thích.

## Đăng ký
![Muvia Logo](clients/muvia/public/readme_07.png)
## Đăng nhập
![Muvia Logo](clients/muvia/public/readme_08.png)
## Trang chủ
![Muvia Logo](clients/muvia/public/readme_01.png)
![Muvia Logo](clients/muvia/public/readme_home_01.png)
![Muvia Logo](clients/muvia/public/readme_home_02.png)
## Lọc phim
![Muvia Logo](clients/muvia/public/readme_02.png)
## Chi tiết
![Muvia Logo](clients/muvia/public/readme_03.png)
![Muvia Logo](clients/muvia/public/readme_detail_01.png)
## Xem phim
![Muvia Logo](clients/muvia/public/readme_04.png)
![Muvia Logo](clients/muvia/public/readme_watching_01.png)
## Yêu thích
![Muvia Logo](clients/muvia/public/readme_05.png)
## Xem gần đây
![Muvia Logo](clients/muvia/public/readme_06.png)

## Tính Năng Chính

- **Đăng ký:** Người dùng đăng ký bằng tài khoản email, và phải xác nhận mã được gửi từ email nhằm đảm bảo tính xác thực.
- **Đăng nhập:** Người dùng đăn nhập bằng tài khoản đã đăng ký và đã được xác nhận bằng mã gửi tới email.
- **Tra cứu phim:** Chúng tôi cung cấp hơn 2000 bộ phim ở nhiều thể loại khác nhau, từ phim chiếu rạp đến phim truyền hình,....
- **Lọc nâng cao:** Người dùng có thể tìm kiếm thể loại, quốc gia sản xuất, năm phát hành, và các yếu tố khác.
- **Tìm kiếm theo tên:** Người dùng có thể tìm kiếm phim theo tên cụ thể.
- **Quản lý phim yêu thích:** Người dùng có thể thích hoặc bỏ thích phim, quản lý trong trang cá nhân.
- **Quản lý phim đã xem:** Khi người dùng xem phim, hệ thống tự động ghi nhận lại tập phim, bộ phim, thời gian coi hiện tại, người dùng có thể xóa lịch sử trong trang cá nhân.
- **Xem phim:** Người dùng có thể xem phim, điều chỉnh tốc độ, tua theo thời gian, play, pause,... 


## Công Nghệ Sử Dụng

- **Muvia** được phát triển dựa theo kiến trúc Microservice Monorepo, phát triển Graphql API cung cấp dữ liệu cho phía Front-end sử dụng Apollo và Apollo Federation. Phía Back-end cung cấp 3 service chính.
  - **gateway:** Dùng để tổng hợp các subgraph, giúp phía Front-end chỉ cần sử dụng 1 endpoint duy nhất.
  - **user:** Xử lý các tác vụ xác thực cũng như xác nhận người dùng, xác nhận xem tài nguyên dữ liệu có được công khai hay riêng tư.
  - **movie:** Xử lý các tác vụ chính, từ xem phim, yêu thích, quản lý phim cũng như gọi các tác vụ khác từ user service thông qua http.
- **Frontend:** ReactJs, NextJs, Tailwind CSS, HeroUI, Redux-Toolkit, Apollo Client
- **Backend:** NodeJs, NestJs, Apollo Gateway, Apollo Federation, Prisma ORM, Nodemailer.
- **Database:** MongoDB

## Liên Hệ

- Email: phamhuutuan24112003@gmail.com
- Phone: 0928895717


## Giấy Phép

Muvia chỉ phục vụ mục đích học tập và nghiên cứu, không thực hiện thương mại với các nội dung phim bên trong trang web. 
