import useStore from "../store/store";

const Form = () => {
const Inputs=useStore((state)=>state.Inputs);
const handleChange=useStore((state)=>state.handleChange)
const handleSubmit=useStore((state)=>state.handleSubmit)
  return (
     <>
        <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
}} >
            <label>Title</label>
            <input 
            type="text"
            name='title'
            value={Inputs.title}
            onChange={(e)=>handleChange(e.target.name,e.target.value)}
            placeholder='Enter Title'
            />

            <textarea
            
            name="content"
            value={Inputs.content}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Write your note..."
            />

            <label>Category</label>
            <select name="category" value={Inputs.category} onChange={(e) => handleChange(e.target.name, e.target.value)} >
              <option value="">Select Category</option>
              <option value="Work">work</option>
               <option value="Personal">personal</option>
                <option value="Ideas">ideas</option>
                 <option value="Tasks">task</option>
            </select>

             <button type="submit">Save</button>
        </form>
     </>
  )
}

export default Form