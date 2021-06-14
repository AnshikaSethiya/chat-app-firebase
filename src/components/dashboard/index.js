import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import { database } from '../../misc/Firebase'
import EditableInput from '../EditableInput'
import AvatarUploadBtn from './AvatarUploadBtn'
import ProviderBlock from './ProviderBlock'
import { getUserUpdates } from '../../misc/Helpers'


const Dashboard = ({ onSignOut }) => {

    const { profile } = useProfile()

    const onSave = async newData => {
        // const userNicknameRef = database
        // .ref(`/profiles/${profile.uid}`)
        // .child('name');
    

        try {
            // await userNicknameRef.set(newData)

           const updates = await getUserUpdates(
               profile.uid,
                'name',
                newData,
                database);

            await database.ref().update(updates)

            Alert.info("Nickname has been updated", 4000)


        } catch (error) {
            Alert.error(error.message, 4000)
        }
    }
    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    Dashboard
                </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <h3>Hey, { profile.name}</h3>
                <ProviderBlock />
                <Divider />
                <EditableInput 
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className="mb-2">Nickname</h6>}
                />
                <AvatarUploadBtn />
            </Drawer.Body>

            <Drawer.Footer>
                <Button block color="red" onClick={onSignOut}>
                    Sign out
                </Button>
            </Drawer.Footer>
        </>
    )
}

export default Dashboard;
