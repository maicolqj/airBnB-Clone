import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );

    const onChange = (field: keyof T, value: string  ) => {
        setState({
            ...state,
            [field]: value
        });
    }
    return {
        ...state,
        form: state,
        onChange,
    }

}