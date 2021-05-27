import React, { useContext } from 'react';

import { View, Text, FlatList } from 'react-native';

import MutedLocalizationsItem from '../MutedLocalizations/MutedLocalizationsItem';

import { RootStoreContext } from '../../store/rootStore';

import { observer } from 'mobx-react-lite';

const MutedLocalizations = () => {

    const rootStore = useContext(RootStoreContext);
    const {
        Localizations
    } = rootStore.mutedLocalizationsStore;

    return (
        <View>
            <FlatList
                data={Localizations}
                renderItem={({ item }) => (
                    <MutedLocalizationsItem
                        key={item.Id}
                        id={item.Id}
                        name={item.Name}
                        type={item.Type}
                        icon={item.Icon}
                    />
                )}
            />
        </View>
    )
}

export default observer(MutedLocalizations);