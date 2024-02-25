import "./index.css";

function App() {
  return (
    <div className="bg-white h-screen">
      <div className=" ">
        <button className="btn">Hello daisyUI</button>
      </div>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        Button
      </button>
      <button className="btn btn-primary">Button</button>
      <button className="btn btn-error">Button</button>
      <button className="btn btn-secondary btn-circle">Button</button>
      <div className="h-3/10 w-10/10 bg-slate-600" >
      <div className="glass h-8/10 pt-28">Glass</div>

      </div>


    </div>
  );
}

export default App;
