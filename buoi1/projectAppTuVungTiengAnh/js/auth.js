let predefinedAdmin = {
    firstName: "Admin",
    lastName: "Account",
    email: "admin@example.com",
    password: "Admin1234",
    role: "admin"
};
let users = JSON.parse(localStorage.getItem("users") || "[]");
// Kiểm tra nếu chưa có admin nào, thêm vào danh sách
if (!users.some(user => (user.role || "").toLowerCase() === "admin")) {
    users.push(predefinedAdmin);
    localStorage.setItem("users", JSON.stringify(users));
}
function register() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = document.getElementById("registerMessage");
    message.textContent = "";
    // Kiểm tra dữ liệu nhập
    if (!firstName || !lastName) {
        message.textContent = "Họ và tên không được để trống.";
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = "Email không hợp lệ.";
        return;
    }
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        message.textContent = "Mật khẩu phải chứa chữ hoa, chữ thường và số, có ít nhất 8 ký tự.";
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = "Xác nhận mật khẩu không khớp.";
        return;
    }
    // Kiểm tra email đã tồn tại
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    // Chuyển email nhập vào thành chữ thường để kiểm tra chính xác hơn
    let emailNormalized = email. trim(). toLowerCase();
    if (users.some(user => user.email.trim(). toLowerCase() === emailNormalized)) {
        message.textContent = "Email đã tồn tại.";
        return;
    }
    // Thêm user mới
    users.push({ firstName, lastName, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    // Lưu email mới vào localStorage để tự động điền vào form đăng nhập
    localStorage.setItem("pendingLoginEmail", email);
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
}
function login() {
    let username = document.getElementById("loginUsername"). value.trim().toLowerCase();
    let password = document.getElementById("loginPassword"). value;
    let rememberMe = document.getElementById("rememberMe")?. checked || false;
    let message = document.getElementById("loginMessage");
    if (message) message.textContent = ""; // Xóa thông báo lỗi trước khi kiểm tra
    // Kiểm tra nếu thiếu dữ liệu
    if (!username || !password) {
        message.textContent = "Vui lòng nhập đầy đủ email và mật khẩu.";
        return;
    }
    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage. getItem("users") || "[]");
    // Tìm tài khoản phù hợp (email không phân biệt hoa/thường)
    let user = users.find(u => u.email. toLowerCase() === username && u. password === password);
    if (!user) {
        message. textContent = "Sai thông tin đăng nhập.";
        return;
    }
    // Lưu trạng thái đăng nhập nếu chọn "Ghi nhớ"
    if (rememberMe) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
    // Kiểm tra vai trò và chuyển hướng
    window. location.href = "home.html"; // Chuyển đến trang chủ sau khi đăng nhập
    // Kiểm tra nếu là admin
    if (user.role === "admin") {
        window. location.href = "admin-dashboard.html"; // Admin chuyển hướng đến trang quản trị
    } else {
        window. location.href = "home.html"; // Người dùng thường chuyển hướng đến trang chính
    }
document .addEventListener("DOMContentLoaded", function () {
    let pendingEmail = localStorage .getItem("pendingLoginEmail");
    if (pendingEmail) {
            document .getElementById("loginUsername").value = pendingEmail;
            localStorage .removeItem("pendingLoginEmail"); // Xóa sau khi điền
    }
});
}
