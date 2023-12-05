import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address').required('Email is Required'),
            password: Yup.string().required('Password is Required'),
        }),
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                // Simulate an asynchronous operation (e.g., API call)
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log(values);
            } finally {
                setIsLoading(false);
            }
        },
    });
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="bg-white flex max-h-[70vh] max-w-md mx-auto rounded-2xl my-[7vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <img
                        className="mx-auto h-20 w-auto mb-4 rounded-full"
                        src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.15752-9/405535486_359346463252690_2193117529614283396_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=LkIV_lf03b0AX8SskVD&_nc_ht=scontent.fktm7-1.fna&oh=03_AdT_HZEsnN1s2HGdUcuBw8fltmSYYjfmnlknQFP-wwYjug&oe=65922E9E" // Replace with your agriculture logo
                        alt="Agriculture Logo"
                    />
                    <h2 className="mt-2 text-2xl font-bold leading-8 text-green-800">
                        AgroScan Login
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder='Enter Your Email'
                                    {...formik.getFieldProps('email')}
                                    className={`block w-full rounded-md px-3 py-2 border-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${formik.errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to={"#"} className="font-semibold text-green-600 hover:text-green-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder='Enter Your Password'
                                    {...formik.getFieldProps('password')}
                                    className={`block w-full rounded-md px-3 py-2 border-2 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${formik.errors.password ? 'border-red-500' : ''
                                        }`}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                                )}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? (
                                        // Eye Open Icon
                                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 10c0-3.9 3.1-7 7-7s7 3.1 7 7h-1c0-3.3-2.7-6-6-6s-6 2.7-6 6H1zm4 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm1 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" /></svg>
                                    ) : (
                                        // Eye Closed Icon
                                        <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.68788 8.3059C1.36566 7.85735 1.46807 7.23252 1.91662 6.9103C2.36517 6.58809 2.99 6.6905 3.31221 7.13905C3.61607 7.56204 4.08478 7.96552 4.6918 8.31591C5.98518 9.0625 7.7771 9.5 9.7043 9.5C11.6315 9.5 13.4234 9.0625 14.7168 8.31591C15.3238 7.96552 15.7925 7.56204 16.0964 7.13905C16.4186 6.6905 17.0434 6.58809 17.492 6.9103C17.9405 7.23252 18.0429 7.85735 17.7207 8.3059C17.2402 8.97475 16.5568 9.56308 15.7167 10.048C14.1049 10.9784 11.9685 11.5 9.7043 11.5C7.44007 11.5 5.30367 10.9784 3.69195 10.048C2.85179 9.56308 2.16836 8.97475 1.68788 8.3059Z" fill="#000000" />
                                            <path d="M11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11L9 13.5C9 14.0523 9.44772 14.5 10 14.5C10.5523 14.5 11 14.0523 11 13.5L11 11Z" fill="#000000" />
                                            <path d="M5.52985 10.7575C5.6638 10.2217 6.20673 9.8959 6.74253 10.0298C7.27832 10.1638 7.60408 10.7067 7.47013 11.2425L6.97013 13.2425C6.83619 13.7783 6.29325 14.1041 5.75746 13.9701C5.22166 13.8362 4.8959 13.2933 5.02985 12.7575L5.52985 10.7575Z" fill="#000000" />
                                            <path d="M13.9702 10.7575C13.8362 10.2217 13.2933 9.8959 12.7575 10.0298C12.2217 10.1638 11.8959 10.7067 12.0299 11.2425L12.5299 13.2425C12.6638 13.7783 13.2067 14.1041 13.7425 13.9701C14.2783 13.8362 14.6041 13.2933 14.4702 12.7575L13.9702 10.7575Z" fill="#000000" />
                                            <path d="M16.5249 8.29289C16.1344 7.90237 15.5012 7.90237 15.1107 8.29289C14.7201 8.68342 14.7201 9.31658 15.1107 9.70711L17.1107 11.7071C17.5012 12.0976 18.1344 12.0976 18.5249 11.7071C18.9154 11.3166 18.9154 10.6834 18.5249 10.2929L16.5249 8.29289Z" fill="#000000" />
                                            <path d="M3.07775 8.32742C3.44921 7.91872 4.08165 7.88853 4.49036 8.25999C4.89906 8.63145 4.92924 9.26389 4.55779 9.67259L2.74002 11.6726C2.36857 12.0813 1.73612 12.1115 1.32742 11.74C0.918719 11.3686 0.88853 10.7361 1.25999 10.3274L3.07775 8.32742Z" fill="#000000" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 relative"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V1.5"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-700">
                        Not a member?{' '}
                        <Link to={"/register"} className="font-semibold leading-6 text-green-600 hover:text-green-500">
                            Join our community
                        </Link>
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="flex items-center justify-center w-full rounded-md border-2 border-black-500 bg-white px-4 py-2 text-sm font-semibold leading-6 text-black shadow-sm "
                            onClick={() => alert("Sign up with Google clicked")} // Replace with your Google signup logic
                        >
                            <img
                                className="mr-2 h-5 w-5"
                                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                alt="Google Logo"
                            />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
