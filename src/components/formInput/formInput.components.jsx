// import './formInput.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="">
      <div className="md:w-1/3">
        <label
          className={
            'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          }
        >
          {label}
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default FormInput;
