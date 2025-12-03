import { Form, Input } from 'usetheform';

export default function TripDescriptionWizard ({prevPage, props}: any) {
    return (
        <Form name="page2" {...props}>
            <Input type="text"></Input>
            <button type="button" onClick={prevPage}></button>
            <button type="submit">Next Page</button>
        </Form>
    )
}