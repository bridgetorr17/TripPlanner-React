import { Form, Input } from 'usetheform';

export default function TripDatesWizard (props: { prevPage: () => void; onSubmit: () => void}) {
    
    const { prevPage, onSubmit } = props;
    
    return (
        <Form name="page3" onSubmit={onSubmit}>
            {/* <Input type="text" name="tripdates"></Input> */}
            <span>trip dates here</span>
            <button type="button" onClick={prevPage}>BACK</button>
            <button type="submit">NEXT</button>
        </Form>
    )
}