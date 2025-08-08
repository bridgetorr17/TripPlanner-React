import List from "./List";
import DynamicListInput from "./DynamicListInput";

const Contributors = ({editMode, contributors, setContributors}) => {
    return (
        <>
            { editMode ?
                <DynamicListInput 
                    label='Contributor' 
                    values={contributors} 
                    setValues={setContributors} 
                    name='contributors'
                    color='teal'/>
            :  <List 
                    arr={contributors}
                    links={true}/>
            }
        </>

    )
}

export default Contributors;