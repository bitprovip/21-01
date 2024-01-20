import './Role.scss'
import {useState} from 'react'
import _ from 'lodash'
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'
import {createRoles} from '../../../services/roleService';
import NavHeader from '../Navigation/NavHeader'

const Role = (props) =>{

    const dataChildDefault = {url: '', mota: '', isValidUrl: true}
    const [listChilds,setListChilds] = useState({
        child1: dataChildDefault
    })

    const handlOnchangeInput = (name,value,key) =>{
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        
        if(value && name ==='url'){
            _listChilds[key]['isValidUrl']= true;
        }

        setListChilds(_listChilds)
    }

    const handleAddNewInput = () =>{
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) =>{
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }

    const buildDataToPersist = () =>{
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key,child], index) => {
            result.push({
                url: child.url,
                mota: child.mota
            })
        })
        return result;
    }

    const handleSave = async() =>{
        let invalidObj = Object.entries(listChilds).find(([key,child], index) =>{
            return child && !child.url;
            // console.log(listChilds);
        })

        if(!invalidObj) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            // console.log(data);
            if(res && res.EC === 0){
                toast.success(res.EM)
            }
        }else {
            toast.error('input URL must not be empty...')
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);
        }

    }

    return (
        <>
        <NavHeader/>
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title-role'><h3> Add a new Groups</h3></div>
                    <div className='role-parent'>
                        {
                            Object.entries(listChilds).map(([key,child],index) =>{
                                return(
                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className={`col-5 form-group ${key}`}>
                                            <label>URL: </label>
                                            <input
                                                type='text'
                                                className={child.isValidUrl ? 'form-control' : 'form-control is-invalid' }
                                                value={child.url}
                                                onChange={(event) => handlOnchangeInput('url', event.target.value,key)}
                                            />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Mo ta: </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={child.mota}
                                                onChange={(event) => handlOnchangeInput('mota', event.target.value,key)}
                                            />
                                        </div>
                                        <div className='col-2 mt-5 actions'>
                                            <i className='fa fa-plus-circle add' onClick={()=> handleAddNewInput()}></i>
                                            { index >= 1 &&
                                                <i className='fa fa-trash-o delete' onClick={()=> handleDeleteInput()}></i>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <button className='btn btn-warning mt-3' onClick={()=> handleSave()}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Role;