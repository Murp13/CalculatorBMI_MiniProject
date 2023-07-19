
// Fungsi untuk Form BMI ketika di submit
document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let bb = parseFloat(document.getElementById("bb").value);
    let tb = parseFloat(document.getElementById("tb").value);

    // Peringatan apabila data tidak sesuai
    if (isNaN(bb) || isNaN(tb) || bb <= 0 || tb <= 0) {
        alert('Please enter valid weight and height values.');
        return;
    }

    // Inisialisasi bmiFunction()
    let bmi, category;
    [bmi, category] = bmiFunction(bb, tb);

    // Menyimpan value dari form di sessionStorage
    sessionStorage.setItem('bmiValue', bmi);
    sessionStorage.setItem('categoryValue', category);

    //maka menyembunyikan body pertama dan menampilikan body kedua
    document.querySelector('.first-body').style.display = 'none';
    document.querySelector('.second-body').style.display = 'block';

    // Menampilkan hasil BMI value dan category 
    document.getElementById('result').innerHTML = `
        <div style="font-size: 60px; font-weight: 700; letter-spacing: 0.9px; text-align: center;">${bmi}</div>
        <div style="font-size: 22px; text-align: center; color: var(--category-color);">${category}</div>`;

    // Set warna berdasarkan kategori
    let categoryElement = document.getElementById('category');
    categoryElement.classList.remove('category-kekurangan', 'category-normal', 'category-kelebihan', 'category-obesitas');

    if (category === 'Kekurangan Berat Badan') {
        categoryElement.textContent = 'Kurang Sehat karena asupan gizi kurang & olahraga';
        categoryElement.classList.add('category-kekurangan');
    } else if (category === 'Ideal') {
        categoryElement.textContent = 'Sehat, Tetap dijaga ya :)';
        categoryElement.classList.add('category-normal');
    } else if (category === 'Kelebihan Berat Badan') {
        categoryElement.textContent = 'Kurang sehat karena asupan gizi berlebih & perlu menambah olahraga';
        categoryElement.classList.add('category-kelebihan');
    } else if (category === 'Kegemukan (Obesitas)') {
        categoryElement.textContent = 'Kurang sehat karena asupan gizi terlalu berlebihan. Sehingga perlu olahraga ekstra';
        categoryElement.classList.add('category-obesitas');
    }

});

// Tombol"Kembali"
// Ketika Tombol"Kembali" aktif, maka menampilkan body pertama dan menyembunyikan body kedua
document.getElementById('kembali').addEventListener('click', function (e) {
    e.preventDefault();

    // Menghapus value yang masih ada di sessionStorage
    sessionStorage.removeItem('bmiValue');
    sessionStorage.removeItem('categoryValue');

    // Menampilkan body kedua dan menyembunyikan body pertama
    document.querySelector('.first-body').style.display = 'block';
    document.querySelector('.second-body').style.display = 'none';
});

// Perhitungan BMI
function bmiFunction(bb, tb) {
    let bmi = (bb / Math.pow(tb / 100, 2)).toFixed(1);
    let category;

    if (bmi < 18.5) {
        category = "Kekurangan Berat Badan";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Ideal"; // Change "Normal" to "Ideal"
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Kelebihan Berat Badan";
    } else {
        category = "Kegemukan (Obesitas)";
    }

    return [bmi, category];

}
