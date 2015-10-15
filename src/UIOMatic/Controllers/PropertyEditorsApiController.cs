﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using UIOMatic.Interfaces;
using Umbraco.Core.Persistence;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace UIOMatic.Controllers
{
    [PluginController("UIOMatic")]
    public class PropertyEditorsApiController: UmbracoAuthorizedJsonController
    {
        public IEnumerable<Type> GetAllTypes()
        {
            return Helper.GetTypesWithUIOMaticAttribute();
        }

        public IEnumerable<object> GetAllObjects(string typeName, string sortColumn, string sortOrder)
        {
            object ctrl = Activator.CreateInstance(Config.DefaultObjectControllerType, null);
            return ((IUIOMaticObjectController)ctrl).GetAll(typeName, sortColumn, sortOrder);

        }
    }
}