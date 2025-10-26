// PENTING: Sesuaikan URL dan PORT ini dengan API ANDA!
let baseUrl = 'https://localhost:7030/api'

let CategoryModule = 'CategoriesApi'

const apiUrl = `${baseUrl}/${CategoryModule}`

// ambil elemen2 dari HTML

const listElement = document.getElementById('category-list')
const addButton = document.getElementById('add-button')
const nameInput = document.getElementById('new-category-name')

//Fungsi untuk ambil data atau interaksi dengan API

async function fetchCategories() {
    console.log("mengambil data dari API...")
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok){
            console.log('error ketika fetch API')
            throw new Error(`Http error! status code: ${response.status}`)
        }

        const data = await response.json();

        listElement.innerHTML = '';

        //looping data dan tampilkan di halaman
        data.forEach(category => {
            const li = document.createElement('li');
            
            //buat nama kategori
            const textNode = document.createTextNode(category.categoryName);
            li.appendChild(textNode);

            //buat tombol hapus
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.className = 'delete-button';

            //nambahin event listener
            deleteButton.addEventListener('click', () => {
                deleteCategory(category.id);
            });

            li.appendChild(deleteButton);

            listElement.appendChild(li);

        });
    }catch(error){
        console.log('gagal mengambil data, dengan error: '+ error)
        listElement.innerHTML = '<li> Gagal memuat Data. cek Console browser </li>';
    }
}

async function addCategory() {
    const categoryName = nameInput.value

    if(!categoryName){
        alert(`nama kategori tidak boleh kosong`)
        return;
    }

    const newData = {
        categoryName: categoryName
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)}
        );

        if(response.ok){
            fetchCategories();
            nameInput.value = '';
        } else{
            alert(`'gagal menyimpan data`);
        }
    } catch (error) {
        console.error('error saat mengirim data dengan error :' + error)
    }
}

async function deleteCategory(id) {

    //alert sebelum dihapus
    if(!confirm(`yakin ingin menghapus data dengan ID ${id}`)){
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'}
        );

        if(response.ok){
            fetchCategories();
        } else{
            alert(`gagal menghapus data`);
        }


    } catch (error) {
        console.error(`Error saat menghapus data, dengan error : `+ error);
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    // This code will run as soon as the DOM is ready
    fetchCategories()
});

addButton.addEventListener('click', addCategory);