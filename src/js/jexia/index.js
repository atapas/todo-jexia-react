const jexiaSDK = require("jexia-sdk-js/browser");

const initialize = () => {
    const dataModule = jexiaSDK.dataOperations();
 
    const credentials = {
        projectID: "8b7f35a4-7419-4693-ba17-cdc1960e4e47",
        key: "74bf010f-28f9-4b2d-bb28-1e328caad4ad",
        secret: "FmoBnOWig0NICHplHeMkDoyZ2jD3gz4s6c4HmffJBAw/2tC2G7cYSocni0ohxYfngeZN/GflkOazszSbAiS3yg==",
    };
    
    jexiaSDK.jexiaClient().init(credentials, dataModule);

    return dataModule;
}

export async function list(dataSet) {
    try{
        const dataModule = initialize();
        let records = [];
        records = await dataModule.dataset(dataSet).select().execute();
        console.log(records);
        return records;
    }catch(e) {
        console.log(`Error in listing ${dataset}: ${e}`);
    }
    
}

export async function create(dataSet, payload) {
    let record = [];
    try{
        const dataModule = initialize();
        record = await dataModule.dataset(dataSet).insert(payload).execute();
    }catch(e) {
        console.log(`Error in creating ${dataset}: ${e}`);
    }
    return record;
}

export async function update(dataSet, payload) {
    let record = [];
    try {
        const dataModule = initialize();
        record = await dataModule.dataset(dataSet)
          .update(payload.toUpdate)
          .where(field => field(payload.key).isLike(payload.value))
          .execute();

    }catch(e) {
        console.log(`Error in updating ${dataset}: ${e}`);
    }
    return record;
}

export async function remove(dataSet, filter) {
    let record = [];
    try{
        const dataModule = initialize();
        record = await dataModule.dataset(dataSet)
            .delete().where(field => field(filter.key).isLike(filter.value))
            .execute();
    }catch (e) {
        console.log(`Error in deleting ${dataset}: ${e}`);
    }
    return record;
}
