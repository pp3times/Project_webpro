<template>
    <div id="app">
        <div class="flex justify-center items-center h-screen">
            <div class="w-full max-w-xl space-y-6">
                <p class="text-3xl font-bold">ลงทะเบียน</p>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            ชื่อผู้ใช้
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" name="name" type="text" placeholder="Username" v-model="username">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            รหัสผ่าน
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" name="password1" type="password" placeholder="******************" v-model="password1">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            ยืนยันรหัสผ่าน
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password2" name="password2" type="password" placeholder="******************" v-model="password2">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            เบอร์โทรศัพท์
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="tel" name="tel" type="tel" placeholder="Tel." v-model="tel">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            ที่อยู่
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="address" name="address" type="text" placeholder="Address" v-model="address">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            อีเมล
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" name="email" type="text" placeholder="Email" v-model="email">
                    </div>
                    <div class="flex grid grid-cols-3 gap-4">
                        <div class="mb-6 col-span-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                วันเกิด
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="date" name="date" type="date" v-model="birth">
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                เพศ
                            </label>
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-96">
                                    <select name="gender" class="form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" v-model="gender">
                                        <option selected>Selected</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="register()">
                            สมัครสมาชิก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
    name: "Home",
        data() {
            return {
                username : '',
                password1 : '',
                password2 : '',
                tel : '',
                email : '',
                address : '',
                birth : Date,
                gender : 'Selected'
            };
        },
        methods :{
            register(){
                axios
                    .post(`http://localhost:3000/register/account`, {
                        username : this.username, password1 : this.password1, password2 : this.password2, tel : this.tel, email : this.email, birth : this.birth, address : this.address, gender : this.gender
                    })
                    .then((response) => {
                        this.$router.push('/login')
                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    });
            }
        }
    };
</script>
