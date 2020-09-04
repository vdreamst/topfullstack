import {prop, modelOptions, arrayProp, Ref} from "@typegoose/typegoose"
import {ApiProperty} from "@nestjs/swagger"
import {Episode} from "@libs/db/models/episode.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Course {
    @ApiProperty({description: "课程名称"})
    @prop()
    name: string

    @ApiProperty({description: "封面"})
    @prop()
    cover: string

    @arrayProp({itemsRef:'Episode'})
    episodes: Ref<Episode>[]


}