import axios from 'axios';
import React from 'react';

const UseAxiosSecure = () => {
    const axiosSecure=axios.create({
    baseURL:'https://3dserver.vercel.app'
}
)
    return (
      axiosSecure
    );
};

export default UseAxiosSecure;