import { Form, Input } from 'usetheform';

export default function TripTypeWizard (props: any) {
    return (
        <Form name="page1" {...props}>
            <Input type="text"></Input>
            <button type="submit">Next Page</button>
        </Form>
    )
}