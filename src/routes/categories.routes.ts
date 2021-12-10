import { Request, Response, Router } from 'express';
import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../service/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const allCategories = categoriesRepository.list();

  return res.json(allCategories);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

export default categoriesRoutes;