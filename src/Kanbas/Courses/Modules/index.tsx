import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {

  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [ modules, setModules ] = useState<any>([]);
  const [ editingModule, setEditingModule ] = useState<any>({});

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    setModules([...modules, module]);
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    setModules(modules.filter((module: any) => module._id !== moduleId));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    setModules(modules);
  };
  
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    setModules(modules.map((m: any) => {
      if (m._id === module._id) {
        return module;
      } else {
        return m;
      }
    }));
  };

  const editModule = async (moduleId: string) => {
    const updatedModules = modules.map((m: any) => {
      if (m._id === moduleId) {
        setEditingModule(m);
        return { ...m, editing: true };
      } else {
        return m;
      }
    });
    setModules(updatedModules);
  }

  useEffect(() => {
    fetchModules();
  }, []);

    return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse}/> 
        <br/><br/><br/>
        <ul id="wd-modules" className="list-group rounded-0">
          {modules
            .map((module: any) => (
              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />  
                      {!module.editing && module.name}
                      { module.editing && (
                        <input className="form-control w-50 d-inline-block"
                              onChange={(e) => setEditingModule({ ...editingModule, name: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveModule({ ...editingModule, editing: false });
                                }
                              }}
                              value={editingModule.name}/>
                      )}
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => removeModule(moduleId)}
                      editModule={(moduleId) => {editModule(moduleId)}}/>
                </div>
                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li className="wd-lesson list-group-item p-3 ps-1">
                        <span className="wd-title">
                          <BsGripVertical className="me-2 fs-3" />
                          {lesson.name}
                          <LessonControlButtons /></span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          }
        </ul>
      </div>
  );}
  