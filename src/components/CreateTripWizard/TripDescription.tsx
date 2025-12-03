import { Form, Input } from 'usetheform';

export default function TripDescriptionWizard (props: { prevPage: () => void; onSubmit: () => void}) {

    const { prevPage, onSubmit } = props;

    return (
        <Form name="page2" onSubmit={onSubmit}>
            {/* <Input type="text" name="tripdesc"></Input> */}
            <span>trip description here</span>
            <button type="button" onClick={prevPage}>BACK</button>
            <button type="submit">Next Page</button>
        </Form>
    )
}