import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SubjectsActionCreators from '../store/action-creators/subjects'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(SubjectsActionCreators, dispatch)
}