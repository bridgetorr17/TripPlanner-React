import { Form, Input } from 'usetheform';

export default function TripTypeWizard (props: { onSubmit: () => void }) {

    const { onSubmit } = props;

    return (
        <Form onSubmit={onSubmit}>
            {/* <Input type="text" name="triptype"></Input> */}
            <span>select trip type here</span>
            <button type="submit">NEXT</button>
        </Form>
    )
}