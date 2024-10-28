import { Field, ErrorMessage } from "formik";
import { useAuthContext } from "../../contexts/authContext";
export function Input({ name, children, type, component }) {
    const { token } = useAuthContext();
    if (type == "radio") {
        return (<label className="mr-2">
            <Field type={type} name={name} value={children} disabled={token == undefined} />
            <span>{children}</span>
        </label>)
    }
    else if (component != null) {
        return <div class="flex-fill d-flex flex-column mb-2">
            <div class="h6">{children}</div>
            <Field name={name} component={component} class="rounded-2 w-100 flex-fill" disabled={token == undefined} />
        </div>
    }
    else if (type != null) {
        return <div class="flex-fill">
            <div class="h6">{children}</div>
            <Field name={name} type={type} class="rounded-2" disabled={token == undefined} />
        </div>
    }
    else
        return (<div class="mb-3 flex-fill">

            <div class="h6">{children}</div>
            <div class="row">
                <div class="col-6 flex-fill d-flex flex-column"> <Field name={name} class="rounded mr-2" disabled={token == undefined} /> </div>
                <div class="col-2 flex-fill"></div>
            </div>

            <ErrorMessage name={name}>
                {msg => <div class="text-danger">{msg}</div>}
            </ErrorMessage>
        </div>);
}
