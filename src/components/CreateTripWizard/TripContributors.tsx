import { Form, Input } from 'usetheform';

export default function TripContributorsWizard (props: { prevPage: () => void; onSubmit: () => void }) {
    
    const { prevPage, onSubmit } = props;

    return (
        <Form onSubmit={onSubmit}>
            {/* <Input type="text" name="trippeople"></Input> */}
            <span>trip contributors here</span>
            <button type="button" onClick={prevPage}>BACK</button>
            <button type="submit">SUBMIT</button>
        </Form>
    )
}