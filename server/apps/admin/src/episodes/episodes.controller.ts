import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode,
  routes:{
    find:{
      sort:{"_id":-1}
    }
  }
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属课程',
          dicData: courses,
          type: 'select',
          row: true,
        },
        { prop: 'name', label: '课时名称', span: 24 },
        {
          prop: 'file',
          label: '课程封面',
          type: 'upload',
          listType: 'picture-img',
          width: '120',
          row: true,
          action: 'upload',
        },
        // {prop: "cover", label: "课程封面"},
      ],
    };
  }
}
