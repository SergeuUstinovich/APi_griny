import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestsDto } from './dto/create-requests.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post(':id')
  createProjects(@Param('id') id: string, @Body() dto: CreateRequestsDto) {
    return this.requestsService.createRequests(dto, id);
  }

  @Put(':id')
  updateProject(
    @Param('id') id: string,
    @Body() dto: Partial<CreateRequestsDto>,
  ) {
    return this.requestsService.updateRequests(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.requestsService.deleteRequests(id);
  }
}
