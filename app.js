import { fetchCategories, addCategory,deleteCategory , updateCategory} from "./apiServices.js"
// PENTING: Sesuaikan URL dan PORT ini dengan API ANDA!
// let baseUrl = 'https://localhost:7030/api'

// let CategoryModule = 'CategoriesApi'

// const apiUrl = `${baseUrl}/${CategoryModule}`

// ambil elemen2 dari HTML

const listElement = document.getElementById('category-list')
const addButton = document.getElementById('add-button')
const nameInput = document.getElementById('new-category-name')

//Fungsi untuk ambil data atau interaksi dengan API

async function tampilkanKategori() {
    // console.log("mengambil data dari API...")
    
    try {
        const data = await fetchCategories();

        listElement.innerHTML = '';

        //looping data dan tampilkan di halaman
        data.forEach(category => {
            const li = document.createElement('li');
            console.log("category" + JSON.stringify(category))
            //buat nama kategori
            const textNode = document.createTextNode(category.categoryName);
            // console.log("categoryy name" + category.categoryName)
            console.log("textnode : " + JSON.stringify(textNode))
            li.appendChild(textNode);

            //buat tombol hapus
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.className = 'delete-button';

            //nambahin event listener
            deleteButton.addEventListener('click', () => {
                handleHapus(category.id);
            });

            li.appendChild(deleteButton);

            listElement.appendChild(li);

            //update section

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.className = 'update-button';

            //nambahin event listener
            updateButton.addEventListener('click', () => {
                handleUpdate(category.id);
            });

            li.appendChild(updateButtons);

            listElement.appendChild(li);

        });
        
    }catch(error){
        listElement.innerHTML = '<li> Gagal memuat Data. cek Console browser </li>';
    }
}

async function handleTambah() {
    const categoryName = nameInput.value

    if(!categoryName){
        alert(`nama kategori tidak boleh kosong`)
        return;
    }

    const newData = {
        categoryName: categoryName
    };

    try {
        const sukses = await addCategory(categoryName);

        if(sukses){
            tampilkanKategori();
            nameInput.value = '';
        } else{
            alert(`'gagal menyimpan data`);
        }
    } catch (error) {
        console.error('error saat mengirim data dengan error :' + error)
    }
}

async function handleHapus(id) {

    //alert sebelum dihapus
    if(!confirm(`yakin ingin menghapus data dengan ID ${id}`)){
        return;
    }

    try {
        const sukses = await deleteCategory(id);
        if (sukses){
            tampilkanKategori();
        
        } else{
            alert(`gagal menghapus data`);
        }


    } catch (error) {
        console.error('Terjadi error : '+ error);
    }
    
}

async function handleUpdate(id, categoryName){
    try{
        const sukses = await updateCategory(id, categoryName);
        if(sukses){
            tampilkanKategori();
        }
        else{
            alert('gagal memperbarui data');
        }
    }
    catch(error){
        alert('Terjadi error : '+ error)
    }
}

document.addEventListener('DOMContentLoaded', tampilkanKategori);

addButton.addEventListener('click', handleTambah);