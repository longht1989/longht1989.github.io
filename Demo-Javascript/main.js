/* Bài 1. Viết 1 function tính bình phương của 1 số. */
function bai1(x) {
    return x * x;
}
// document.write(bai1(10));

/* Bài 2. Cho 3 số a, b và c. Viết function tính bình phương của (3a + 2b - c) */
function bai2(a, b, c) {
    return bai1(3 * a + 2 * b + c);
}
// document.write(bai2(1,1,3));
// document.write(bai2(2,3,5));

/*- Bài 3. Cho 1 chuỗi dài hơn 100 ký tự. Viết 1 function cắt chuỗi, lấy ra 10 ký tự đầu tiên và thêm vào dấu "..." ở cuối chuỗi.*/

function bai3(a) {
    return a.slice(0, 10) + '...';
}
// document.write(bai3('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos voluptate culpa quam at et dolorem aut nesciunt reprehenderit distinctio autem.'));
// document.write(bai3('Nhiếp ảnh gia Urs Zihlmann đã có chuyến đi dài 5 ngày ở Sơn Đoòng, hang động lớn nhất thế giới nằm ở Quảng Bình.'))

/*- Bài 4. Viết 1 function có tác dụng biến 1 chuỗi thành viết hoa từ đầu tiên.*/
function bai4(a) {
    var a = a.toLowerCase();
    return a.charAt(0).toUpperCase() + a.slice(1);
}
// document.write(bai4('Nhiếp ảnh gia Urs Zihlmann đã có chuyến đi dài 5 ngày ở Sơn Đoòng, hang động lớn nhất thế giới nằm ở Quảng Bình.'))

/*- Bài 5. Viết 1 function lấy ra 1 số nhỏ nhất trong 1 mảng các số.*/
function bai5(a) {
    var a = [16, 5, 6, 100, 423, 333];
    a.sort(function(a, b) {
        return a - b
    });
    return a[0];
}
// document.write(bai5());

/*- Bài 6. Cho 1 mảng gồm tên của 5 học viên. Hãy viết function sắp xếp lại thứ tự các học viên theo bảng chữ cái và in ra màn hình danh sách học viên.*/
function bai6(a) {
    var a = ['Nam', 'John', 'Quan', 'Minh', 'Zoom'];
    a.sort();
    return a;
}
// document.write(bai6());

/*- Bài 7. Tạo 3 đối tượng là teacher, student và parent. Mỗi đối tượng đều có các thuộc tính: firstName, lastName, age. Cả 3 đối tượng đều có chung 1 phương thức là say(). Hãy viết function aboutMe() in ra màn hình 1 câu giới thiệu bản thân và gán vào phương thức say() của các đối tượng trên.*/
function bai7() {
    var aboutMe = function() {
        return ('<br>' + 'Xin chào, tên tôi là ' + this.firstName + ' ' + this.lastName + '. Năm nay tôi ' + this.age + ' tuổi.');
    }
    var teacher = {
        firstName: "Thày",
        lastName: "Giáo",
        age: 30,
        say: function() {}
    }
    var parent = {
        firstName: "Phụ",
        lastName: "Huynh",
        age: 33,
        say: function() {}
    }
    var student = {
        firstName: "Sinh",
        lastName: "Viên",
        age: 20,
        say: function() {}
    }
    teacher.say = aboutMe;
    document.write(teacher.say());
    student.say = aboutMe;
    document.write(student.say());
    parent.say = aboutMe;
    document.write(parent.say());
}

bai7();