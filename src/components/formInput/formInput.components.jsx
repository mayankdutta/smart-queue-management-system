// import './formInput.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="max-w-2xl">
      <div className="">
        <label
          className={
            'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          }
        >
          {label}
        </label>
      </div>
      <div class="">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default FormInput;
