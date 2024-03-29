import { useState } from 'react';
import Navbar from '../../components/Navbar';
import * as requestAPI from '../../api/api'
import './style.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';

const CreateMenu = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        imageUrl: "",
        price: "",
    });
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // console.log(formData.name, formData.description, formData.type, formData.imageUrl, formData.price)

    const handleSubmit = async () => {

        // cara rubah nilai dari string ke number
        formData.price = Number(formData.price)
        
        // buat config untuk authorization dan value berupa token
        const token = localStorage.getItem("accessToken")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)

            try {
                const res = await requestAPI.createMenu(formData, config)
                console.log(res);
                navigate('/')
                setLoading(false)
                alert('Menu Berhasil Dibuat')
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
    };

    return (
        <div>
            <Navbar />
            <div className='create-menu'>
            <h1 className='create-title'>Create Menu</h1>
                <input className='create-input' name='name' placeholder='name' onChange={handleInputChange}/>
                <input className='create-input' name='description' placeholder='description' onChange={handleInputChange}/>
                <input className='create-input' name='imageUrl' placeholder='image url' onChange={handleInputChange}
                />
                <input type='number' className='create-input' name='price' placeholder='price' onChange={handleInputChange}/>
                <select className='create-input' name='type' onChange={handleInputChange}>
                    <option value="">type</option>
                    <option value={'beverage'}>beverage</option>
                    <option value={'main-dish'}>main-dish</option>
                </select>
                <div>
                    <button className='create-btn' onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Create'}</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateMenu;
